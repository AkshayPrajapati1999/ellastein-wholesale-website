import EventEmitter from 'eventemitter3';


const eventEmitter = new EventEmitter();

export enum EventEmitterEvents  {
    OnRetailerChange = 'OnRetailerChange',
    UpdateCartAmount = 'UpdateCartAmount'
}

const EmitterService = {
  on: (eventName: EventEmitterEvents, fn) => eventEmitter.on(eventName, fn),
  once: (eventName: EventEmitterEvents, fn) => eventEmitter.once(eventName, fn),
  off: (eventName: EventEmitterEvents, fn) => eventEmitter.off(eventName, fn),
  emit: (eventName: EventEmitterEvents, payload) => eventEmitter.emit(eventName, payload)
}

Object.freeze(EmitterService);

export default EmitterService;