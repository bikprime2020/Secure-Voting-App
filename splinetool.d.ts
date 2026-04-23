declare module '@splinetool/react-spline' {
  export interface SplineProps {
    scene: string;
    className?: string;
    onLoad?: (e: any) => void;
  }
  export default function Spline(props: SplineProps): JSX.Element;
}
