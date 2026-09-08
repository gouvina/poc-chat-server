import { SetMetadata } from "@nestjs/common"

export const PUBLIC_ENDPOINT = 'public'
export const Public = () => SetMetadata(PUBLIC_ENDPOINT, true)
