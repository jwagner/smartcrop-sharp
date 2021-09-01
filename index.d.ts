/// <reference types="smartcrop" />

import { CropOptions, CropResult } from "smartcrop";

/**
 * Find the best crop for *image* using *options*.
 * @param image - A string (path to file) or buffer of image source.
 * @param cropOptions - Crop options based to `smartcrop.js`.
 * @return Promise that resolves with the final crop result that can then be
 * used by `sharp` to extract your final image.
 */
export function crop(image: Buffer | string, cropOptions: CropOptions): Promise<CropResult>;

