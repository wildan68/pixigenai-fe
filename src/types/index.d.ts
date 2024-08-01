import { ReactElement } from 'react';
import { IconType } from 'react-icons';

export interface ISideBarItem {
  key:        string;
  label?:     string;
  icon?:      ReactElement<IconType>;
  children?:  ISideBarItem[];
}

export interface IPagination {
  page?:      number;
  per_page?:  number;
  total?:     number;
  [key: string]: string | number | undefined;
}

export interface IShutterStockItems {
  id:              string;
  assets: {
    huge_thumb: {
      url:         string;
      height:      number;
      width:       number;
    }
  }
  description:     string;
}