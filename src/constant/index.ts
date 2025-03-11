import { nanoid } from 'nanoid'

export const appName = 'markdown-export'

export const appId = `${appName}-${nanoid(5)}`

export enum MessageType {
  ExportPage = 'ExportPage',
  ExportSelect = 'ExportSelect',
  OpenOptions = 'OpenOptions',
}

export interface SendMessage<P = any> {
  type: MessageType
  payload?: P
}

export interface ResponseMessage<P = any> {
  payload?: P
}

export const defaultStorage = {
  md: '',
}

export type DefaultStorage = typeof defaultStorage
