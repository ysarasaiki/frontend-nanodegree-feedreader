/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // Test Suite for the RSS Feeds object
    describe('RSS Feeds', function() {
        // Test to ensure allFeeds variable has been defined, is
        // not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            expect(allFeeds.length).not.toBe(undefined);
        });

        // Test to ensure all elements in the allFeeds object 
        // (i.e., each feed) has a url defined and not empty 
        it('have a URL', function() {
            for (feed of allFeeds) {
                expect(feed.url).toBeTruthy();
            }
        });

        // Test to ensure all elements in the allFeeds object 
        // (i.e., each feed) has a name defined and not empty 
         it('have a name', function() {
            for (feed of allFeeds) {
                expect(feed.name).toBeTruthy();
            }
         })
    });

    // Test Suite for the menu
    describe('The menu', function() {
        // Test to ensure menu element is hidden by default
        const body = $('body');
        const menuIcon = document.querySelector('.icon-list');

        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
            menuVisible = false;
        })

        // Test to ensure visibility toggles when menu icon 
        // is clicked
        it('changes visibility when menu icon is clicked', function() {
            // Menu is visible when menu icon clicked once
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            // Menu is hidden when menu icon clicked again
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        })        
    })

    // Test suite for Initial Entries
    describe('Initial Entries', function() {
        const feed = document.querySelector('.feed');
        // Make sure the asynchronous loadFeed function is called and 
        // completed
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Expect that there is at least a single .entry element
        // within the .feed container
        it('should have at least a single entry', function() {
            expect(feed.children[0].innerText).toBeTruthy();
        });
    });

    // Test suite for New Feed Selection
    describe('New Feed Selection', function() {
        // When a new feed is selected, the entries should update
        const feed = document.querySelector('.feed');
        let oldFirstEntry;

        // Call asynchronous loadFeed function with first feed,
        // and keep track of fist entry. 
        // Then load another feed.
        beforeEach(function(done) {
            loadFeed(0);
            oldFirstEntry = feed.children[0].innerText;
            loadFeed(1, done);
        })

        // Check if the new feed's first entry is the same as
        // the last feed's first entry
        it('loads new content', function() {
            let newFirstEntry = feed.children[0].innerText;
            expect(oldFirstEntry == newFirstEntry).toBe(false)
        }) 
    })
}());
