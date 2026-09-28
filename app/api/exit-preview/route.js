import {exitPreview} from '@prismicio/next'

// Called by the Prismic toolbar when leaving a preview
export async function GET() {
    return await exitPreview()
}
