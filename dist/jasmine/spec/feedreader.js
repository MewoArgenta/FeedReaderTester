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
    /*This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* this tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('array allFeeds is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* this test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it ('allFeeds objets have url defined', function() {
            allFeeds.forEach(function (element){
                expect(element.url).toBeDefined();
                expect(element.url).not.toBe('')
            })
        })


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it ('allFeeds objects have name defined', function() {
            allFeeds.forEach(function (element){
                expect(element.name).toBeDefined();
                expect(element.name).not.toBe('')
            })
        })

    });




    /* This suite contains the tests who make sure "The menu" is hidden and displayed when it should */
    describe('The menu', function() {

        /* This test ensures the menu element is
         * hidden by default.
         */
         const menu = document.getElementsByTagName('body')[0];

         it ('menu element is hidden', function() {
            expect(menu.className).toBe('menu-hidden')
         })



         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked and hides when clicked again.
          */

        const menuIcon = document.getElementsByClassName('icon-list')[0];

        it ('menu display toggles after clicking menu-icon', function() {
            menuIcon.click();
            expect(menu.className).toBe('');
            menuIcon.click();
            expect(menu.className).toBe('menu-hidden');
        })
    });


    /*This suite contains a test checking the "Initial Entries" */
    describe ('Initial Entries', function() {

        // loadFeed is asynchonous so the expect shouldn't start before the callback is done.
        beforeEach(function(done) {
            loadFeed(0, done);
        });



        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('loadFeed results in at least one element', function(done){

            const entryElements = document.getElementsByClassName('entry-link');
            expect(entryElements.length).toBeGreaterThan(0);
            done();
        })
    })



    /* This suite checks if we have a difference between different elements from AllFeeds */
   describe ('New Feed Selection', function() {

    /* This test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */

    function getLoadFeed(id, cb) {
           loadFeed(id, done);
           function done() {
            cb()
           }
       }

        it ('when a new feed is loaded, the content changes', async function(done) {

            let feedBefore;
            let feedAfter;

            getLoadFeed (0, getLoadFeed1);
            function getLoadFeed1() {
                feedBefore = document.getElementsByClassName('entry-link')[0].getElementsByTagName('h2')[0];
                getLoadFeed (1, getLoadFeed2);
            }

            function getLoadFeed2() {
                feedAfter = document.getElementsByClassName('entry-link')[0].getElementsByTagName('h2')[0];
                expectCall();
            }

            function expectCall() {
                console.log(feedBefore, feedAfter);
                expect(feedBefore !== feedAfter).toBeTruthy();
                done()
            }
        })

    })




}());
