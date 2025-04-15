const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// Configure for your site
const DOMAIN = 'https://threeiacn-ensaf-app.onrender.com';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// List all your routes (add all pages here)
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/Communication', changefreq: 'monthly', priority: 0.8 },
  { url: '/drives', changefreq: 'monthly', priority: 0.8 },
  { url: '/recent', changefreq: 'monthly', priority: 0.7 },
  { url: '/favorites', changefreq: 'monthly', priority: 0.7 },
  { url: '/login', changefreq: 'monthly', priority: 0.6 },
  { url: '/logout', changefreq: 'monthly', priority: 0.6 },
  { url: '/faq', changefreq: 'monthly', priority: 0.7 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/drivemanager', changefreq: 'monthly', priority: 0.8 },
  { url: '/drive/1%20st%20Year', changefreq: 'daily', priority: 0.9 },
  { url: '/drive/testDrive', changefreq: 'daily', priority: 0.9 }

];

async function generateSitemap() {
  try {
    // Create sitemap stream
    const smStream = new SitemapStream({
      hostname: DOMAIN,
      lastmodDateOnly: true // Add only the date part to lastmod
    });

    // Create write stream
    const writeStream = createWriteStream(OUTPUT_PATH);

    // Handle potential errors in write stream
    writeStream.on('error', (error) => {
      console.error('Error writing sitemap:', error);
    });

    // Pipe the sitemap to write stream with error handling
    smStream.pipe(writeStream).on('error', (error) => {
      console.error('Error piping sitemap:', error);
    });

    // Add routes with current date
    routes.forEach(route => {
      smStream.write({
        ...route,
        lastmod: new Date().toISOString() // Add last modification date
      });
    });

    // End the stream and wait for completion
    smStream.end();
    
    // Wait for the stream to complete
    await streamToPromise(smStream);
    
    console.log(`Sitemap generated successfully at ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error; // Propagate error for proper handling
  }
}

// Execute with error handling
generateSitemap().catch(error => {
  console.error('Failed to generate sitemap:', error);
  process.exit(1);
});