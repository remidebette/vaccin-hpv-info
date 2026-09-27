import {redirectToPreviewURL} from '@prismicio/next'
import {linkResolver} from '@/prismic-configuration'
import {createClient} from '@/utils/api'

// Entry point of Prismic previews: shows the draft content of the previewed document
export async function GET(request) {
    return await redirectToPreviewURL({client: createClient(), request, linkResolver})
}
