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

export interface IResponse<T> {
  status:   string
  data:     T
  message?: string
}

export interface IDiscoverItems {
  id:           number
  task_id:      string
  thumb_url:    string
  description:  string
  type:         string
}

export interface IModelItem {
  id:                  string
  user_id:             string
  status:              string
  result: {
    model: {
      id:               string
      type:             string
      url:              string  
    }
    thumbnail: {
      id:               string
      type:             string
      url:              string  
    }
  }
  draft_model_id:      string | null
  prompt:              string
  task_id:             string
  type:                string
  is_private:          boolean
}