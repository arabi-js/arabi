/**
 * this file holds the global configurations for the whole project
 */

export type TranslationMap = {
  target: '#global#' | object,
  map: object | string,
};

export interface Options {
  maps?: any[],
  indent?: string,
  renameIds?: boolean,
  maps: Array<TranslationMap>, 
}

