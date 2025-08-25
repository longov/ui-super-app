import { convertPxToPt } from './utils';

enum EFontSize {
  fontSize100 = convertPxToPt(8),
  fontSize125 = convertPxToPt(10),
  fontSize150 = convertPxToPt(12),
  fontSize162 = convertPxToPt(13),
  fontSize175 = convertPxToPt(14),
  fontSize187 = convertPxToPt(15),
  fontSize200 = convertPxToPt(16),
  fontSize225 = convertPxToPt(18),
  fontSize250 = convertPxToPt(20),
  fontSize275 = convertPxToPt(22),
  fontSize300 = convertPxToPt(24),
  fontSize350 = convertPxToPt(26),
  fontSize400 = convertPxToPt(32),
  fontSize450 = convertPxToPt(36),
  fontSize500 = convertPxToPt(40),
  fontSize550 = convertPxToPt(44),
  fontSize600 = convertPxToPt(48),
  fontSize700 = convertPxToPt(52),
  fontSize800 = convertPxToPt(64),
  fontSize900 = convertPxToPt(72),
  fontSize1000 = convertPxToPt(80),
}

export default EFontSize;
