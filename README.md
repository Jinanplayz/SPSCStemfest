# STEM FEST website

Static site. No build step, no dependencies. Upload the folder as is.

## Files

    index.html        all five sections in one page
    css/base.css      colours, type, shared components
    css/desktop.css   PC layout, loads at 900px and up
    css/mobile.css    phone layout with the bottom dock, loads below 900px
    js/main.js        section switching plus Tally init
    _headers          Cloudflare Pages caching and security headers
    robots.txt
    assets/           drop event photos here if you want them

## Deploy to Cloudflare Pages

1. Sign in to Cloudflare, open Workers and Pages, then Create, then Pages.
2. Choose "Upload assets" if you are not using Git.
3. Drag this whole folder in. Do not zip only the inner files, keep the
   css and js folders intact.
4. Build command: leave empty. Build output directory: leave empty or "/".
5. Deploy. You get a yourproject.pages.dev URL straight away.

For a custom domain, open the project, go to Custom domains, and add it.

## Before you publish, replace these

    [DATE TBC]          hero
    [VENUE TBC]         hero
    [X]% and [Y]%       Events tab pricing ladder, must match the Tally form
    [Name] x6           Team tab
    [email address]     Team tab and footer
    [Instagram handle]  Team tab and footer
    [Year]              footer
    refund policy       last item in the About tab FAQ

## Adding real event photos

Each card currently uses a coloured gradient with a two letter symbol.
To use a photo instead, put the file in assets/ and replace the card media
div in index.html:

    <div class="card-media m-mp">

with:

    <div class="card-media" style="background:url('assets/maths.jpg') center/cover">

Keep the badge and symbol spans inside it. Landscape images at roughly
1200x675 work best.

## Adding winners on the day

The Winners tab has one filled in board as a template. Copy the whole
.board block once per event and grade band, ten in total, and delete the
.empty block once the first results are up.

## Changing the accent colour

One line in css/base.css:

    --accent:#FF2E4D;
