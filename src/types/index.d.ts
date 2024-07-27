import { ReactElement } from 'react';
import { IconType } from 'react-icons';

export interface ISideBarItem {
  key: string;
  label?: string;
  icon?: ReactElement<IconType>;
  children?: ISideBarItem[];
}