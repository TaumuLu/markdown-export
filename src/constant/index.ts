export const appName = 'markdown-export'

export enum MessageType {}

export interface SendMessage<P = any> {
  type: MessageType
  payload?: P
}

export interface ResponseMessage<P = any> {
  payload?: P
}

export const defaultStorage = {}

export type DefaultStorage = typeof defaultStorage
