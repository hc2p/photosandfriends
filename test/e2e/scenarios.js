'use strict';

describe('photosandfriendsApp app', function() {

    beforeEach(function() {
      angular.module('photosandfriendsApp');
      browser().navigateTo('/');
      sleep()
    });

    describe('Homepage', function() {
      it('first it should redirect to the auth route', function() {
        expect(browser().location().path()).toBe('/login');
      });

      it('click on connect button leads to dropbox', function() {
        localStorage.setItem('dropbox-auth:default:FfTRqJMVh2khzkfDMX8y5cmxic', '{"key":"h5yz9hzhs9ddj2w","token":"8LVPqsn1OkYAAAAAAAAAAQ1gCKJ8ivfiNPGgvdXHWWdu9S5XHuZxwlfvjWq6L6pq","uid":"2718518"}');
        sleep();
        expect(browser().location().url()).toBe('/home');
      });
    });

});