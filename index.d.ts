/**
 * Describes a region to boost. A usage example of this is to take into account 
 * faces in the image. See `smartcrop-cli` for an example on how to integrate 
 * face detection in Node.js using ImageMagick with `smartcrop-gm`.
 * @see {@link https://github.com/jwagner/smartcrop.js#boost}
 * @see {@link https://github.com/jwagner/smartcrop-cli}
 */
export interface Boost {
  x: number;
  y: number;
  width: number;
  height: number;
  weight: number;
}

/**
 * All of the documented crop options. Note that there are many more (for now 
 * undocumented) options available. Check the source and be advised that they 
 * might change in the future.
 * @see {@link https://github.com/jwagner/smartcrop.js#cropoptions}
 * @see {@link https://github.com/jwagner/smartcrop.js/blob/master/smartcrop.js#L32}
 */
export interface CropOptions {
  minScale?: number;
  width: number;
  height: number;
  boost?: Boost[];
  ruleOfThirds?: boolean;
  debug?: boolean;
}

/**
 * Result of the promise returned by `smartcrop.crop`. Contains a single 
 * individual crop that can then be used by `sharp` to extract your image.
 * @see {@link https://github.com/jwagner/smartcrop.js#cropresult}
 * @see {@link https://github.com/jwagner/smartcrop.js#crop}
 */
export interface CropResult {
  topCrop: { x: number; y: number; width: number; height: number; };
}

/**
 * Find the best crop for *image* using *options*.
 * @param image - A string (path to file) or buffer of image source.
 * @param cropOptions - Crop options based to `smartcrop.js`.
 * @return Promise that resolves with the final crop result that can then be
 * used by `sharp` to extract your final image.
 */
export function crop(image: Buffer | string, cropOptions: CropOptions): Promise<CropResult>;
