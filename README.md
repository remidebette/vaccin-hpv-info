<h1 align="center">Vaccin HPV Info</h1>
<h3 align="center">A medical prevention website built with Next.js and Prismic</h3>

## About

This is the code behind the medical prevention website [Vaccin HPV Info](https://vaccin-hpv-info.fr/) (French only).  
This is shared as an example of a Next.js + Prismic architecture

## Features

**React.js hooks**

- The best way to handle state in React.

**Next.js (App Router)**

- Pages are React Server Components, statically generated and refreshed in the background
  (incremental static regeneration).

**Prismic CMS**

- Almost all the content of the website can be modified on the CMS with no redevelopment.
- Prismic previews: set the preview URL of the repository to `/preview`.

**Tailwind CSS**

- Utility-first styling. The small set of UI components in `components/ui` (buttons, menus, messages,
  popups...) reproduces the look of the Semantic UI theme the site was designed with.
- Popups are positioned with [Floating UI](https://floating-ui.com/).

**SEO**

- Each page header gets its title, description, canonical URL and Open Graph image from the
  Next.js Metadata API.

**Deployment**

- Ready to deploy on Vercel using git integration or the command line

## Installation

Requires Node.js 22 or later and [pnpm](https://pnpm.io/) (`corepack enable` installs the version the project pins).

Clone the repository and install the dependencies:

```shell
git clone https://github.com/remidebette/vaccin-hpv-info && cd vaccin-hpv-info && pnpm install && pnpm dev
```

## Usage

### Development

Serve with hot reload at localhost:3000.

```
pnpm dev
```

Lint the code:

```
pnpm lint
```

### Build

Build for production: pages are rendered to static HTML and regenerated at most every
`REVALIDATE_TIME_SECONDS` seconds (see `.env.production`) when the content changes on Prismic.

```
pnpm build
```

Launch the production server (after building the application):

```
pnpm start
```

### Configuration

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_HOSTNAME` | Host name used in canonical URLs and the QR code (defaults to `vaccin-hpv-info.fr`) |
| `REVALIDATE_TIME_SECONDS` | Maximum age of a statically generated page, in seconds (defaults to 300) |
| `NEXT_PUBLIC_PRISMIC_ENDPOINT` | Optional Prismic API endpoint, to use another repository than `anti-hpv` |

## License

Released under the [MIT](https://github.com/remidebette/vaccin-hpv-info/blob/master/LICENSE.txt) license.
