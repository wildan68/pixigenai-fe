declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src: string;
      alt: string;
      ar?: boolean;
      'auto-rotate'?: boolean;
      'camera-controls'?: boolean;
      'touch-Action'?: 'pan-y' | 'pan-x';
      'shadow-intensity'?: string;
    };
  }
}