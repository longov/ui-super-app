import { convertPxToPt } from './utils';

enum EBorderSize {
  square = convertPxToPt(0),
  tiny = convertPxToPt(4),
  xsmall = convertPxToPt(6),
  small = convertPxToPt(8),
  medium = convertPxToPt(12),
  large = convertPxToPt(16),
  huge = convertPxToPt(20),
  circle = convertPxToPt(9898),
}

export default EBorderSize;
