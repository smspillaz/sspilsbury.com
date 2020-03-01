export class Audio {
  constructor(moduleInstance) {
    this.context = new (window.webkitAudioContext || window.AudioContext)();
    this.source = null;
    this.processor = null;
    this.analyser = this.context.createAnalyser();
    this.xhr = null;
    this.disconnectTimeout = 0;
    this.module = moduleInstance;
  }

  initAudio = data => {
    this.source = this.context.createBufferSource();
    if (this.context.decodeAudioData) {
      this.context.decodeAudioData(
        data,
        buffer => {
          this.source.buffer = buffer;
          this.createAudio();
        },
        console.error,
      );
    } else {
      this.source.buffer = this.context.createBuffer(
        data,
        false /* mixToMono */,
      );
      this.createAudio();
    }
  };

  createAudio = () => {
    this.processor = this.context.createScriptProcessor(
      512 /* bufferSize */,
      1 /* num inputs */,
      1 /* num outputs */,
    );
    this.processor.onaudioprocess = this.processAudio;
    this.source.connect(this.context.destination);
    this.source.connect(this.analyser);
    this.analyser.connect(this.processor);
    this.processor.connect(this.context.destination);
    this.source.start(0);
    this.disconnectTimeout = setTimeout(
      this.disconnect,
      this.source.buffer.duration * 1000 + 1000,
    );
  };

  disconnect = () => {
    this.source.disconnect(0);
    this.processor.disconnect(0);
    this.analyser.disconnect(0);
    this.disconnectTimeout = 0;
  };

  processAudio = () => {
    const freqByteData = new Float32Array(this.analyser.frequencyBinCount);
    this.analyser.getFloatFrequencyData(freqByteData);
    window.floatArray = freqByteData;
    // eslint-disable-next-line
    const buf = this.module._malloc(
      freqByteData.length * freqByteData.BYTES_PER_ELEMENT,
    );
    // eslint-disable-next-line
    this.module.HEAPF32.set(freqByteData, buf >> 2);
    // eslint-disable-next-line
    this.module._set_frequencies(
      buf,
      this.analyser.minDecibels,
      this.analyser.maxDecibels - this.analyser.minDecibels,
    );
    // eslint-disable-next-line
    this.module._free(buf);
  };

  dropEvent = evt => {
    if (this.disconnectTimeout) {
      this.disconnect();
      window.clearTimeout(this.disconnectTimeout);
      this.disconnectTimeout = 0;
    }
    const droppedFiles = evt.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = fileEvent => {
      const data = fileEvent.target.result;
      this.initAudio(data);
    };
    // eslint-disable-next-line
    console.log(`Now playing: ${droppedFiles[0].name}`);
    reader.readAsArrayBuffer(droppedFiles[0]);
  };

  handleResult = xhr => {
    if (xhr.readyState === 4 /* complete */) {
      switch (xhr.status) {
        case 200 /* Success */:
          this.initAudio(xhr.response);
          break;
        default:
          break;
      }
    }
  };
}
