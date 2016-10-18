/// <reference path="../../../typings/tsd.d.ts" />
var UserService = (function () {
    function UserService(rest) {
        this.rest = rest.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('/api/v1/');
        });
        this.restFull = rest.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('/api/v1/');
            RestangularConfigurer.setFullResponse(true);
        });
    }
    // **get**
    // **@returns** a promise with a user with specific id.
    UserService.prototype.get = function (id) {
        return this.rest.one('users', id).get().then(function (user) {
            return user;
        });
    };
    // **login**
    // **@returns** a promise with user login.
    UserService.prototype.login = function (user) {
        this.currentUser = user.username;
        return this.rest.one('auth').post('login', user);
    };
    // **logout**
    // **@returns** a promise with a user logout.
    UserService.prototype.logout = function () {
        return this.rest.one('auth').post('logout');
    };
    // **getCurrentUser**
    // **@returns** a string with userid
    UserService.prototype.getCurrentUser = function () {
        return this.get('me');
    };
    // **getUsers**
    // **@returns** a promise with list of users
    UserService.prototype.getUsers = function () {
        return this.rest.all('users').getList().then(function (users) {
            return users;
        });
    };
    // **getUserByUserId**
    // **@returns** a promise with user with userId
    UserService.prototype.getUserByUserId = function (userId) {
        return this.rest.one('users', userId).get().then(function (user) {
            return user;
        });
    };
    // **addUser**
    // **@returns** a promise with status code
    UserService.prototype.addUser = function (user) {
        return this.restFull.all('users').post(user);
    };
    // **updateUser**
    // **@returns** a promise with status code
    UserService.prototype.updateUser = function (userId, user) {
        return this.restFull.one('users', userId).customPUT(user);
    };
    // **deleteUser**
    // **@returns** a promise with status code
    UserService.prototype.deleteUser = function (userId) {
        return this.restFull.one('users', userId).remove();
    };
    // **SaveuserSetting**
    // **@returns** a promise with status code
    UserService.prototype.saveUserSetting = function (userId, setting) {
        return this.restFull.one('users', userId).customPUT(setting);
    };
    // **getLdapUsers**
    // **@returns** a promise with list of users
    UserService.prototype.getLdapUsers = function () {
        return this.rest.all('externalusers').getList().then(function (users) {
            return users;
        });
    };
    // **getLdapUsers with page number and pageSize parameters**
    // **@returns** a promise with list of users
    UserService.prototype.getLdapUsersPage = function (searchQuery, pageNumber, pageSize) {
        return this.rest.one('externalusers').get({
            search: searchQuery,
            pageno: pageNumber,
            pagesize: pageSize
        }).then(function (users) {
            return users;
        });
    };
    UserService.$inject = ['Restangular'];
    return UserService;
})();
exports.UserService = UserService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcmVzdC91c2VyLnRzIl0sIm5hbWVzIjpbIlVzZXJTZXJ2aWNlIiwiVXNlclNlcnZpY2UuY29uc3RydWN0b3IiLCJVc2VyU2VydmljZS5nZXQiLCJVc2VyU2VydmljZS5sb2dpbiIsIlVzZXJTZXJ2aWNlLmxvZ291dCIsIlVzZXJTZXJ2aWNlLmdldEN1cnJlbnRVc2VyIiwiVXNlclNlcnZpY2UuZ2V0VXNlcnMiLCJVc2VyU2VydmljZS5nZXRVc2VyQnlVc2VySWQiLCJVc2VyU2VydmljZS5hZGRVc2VyIiwiVXNlclNlcnZpY2UudXBkYXRlVXNlciIsIlVzZXJTZXJ2aWNlLmRlbGV0ZVVzZXIiLCJVc2VyU2VydmljZS5zYXZlVXNlclNldHRpbmciLCJVc2VyU2VydmljZS5nZXRMZGFwVXNlcnMiLCJVc2VyU2VydmljZS5nZXRMZGFwVXNlcnNQYWdlIl0sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFFbEQ7SUFNSUEscUJBQVlBLElBQTZCQTtRQUNyQ0MsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBQ0EscUJBQXFCQTtZQUM5Q0EscUJBQXFCQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUNqREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDSEEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBQ0EscUJBQXFCQTtZQUNsREEscUJBQXFCQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtZQUM3Q0EscUJBQXFCQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNoREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDUEEsQ0FBQ0E7SUFFREQsVUFBVUE7SUFDVkEsdURBQXVEQTtJQUN2REEseUJBQUdBLEdBQUhBLFVBQUlBLEVBQUVBO1FBQ0ZFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNB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UUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsRUFBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7SUFDaEVBLENBQUNBO0lBRURYLG1CQUFtQkE7SUFDbkJBLDRDQUE0Q0E7SUFDNUNBLGtDQUFZQSxHQUFaQTtRQUNJWSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFTQSxLQUFLQTtZQUMvRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQ0EsQ0FBQ0E7SUFDUEEsQ0FBQ0E7SUFFRFosNERBQTREQTtJQUM1REEsNENBQTRDQTtJQUM1Q0Esc0NBQWdCQSxHQUFoQkEsVUFBaUJBLFdBQVdBLEVBQUNBLFVBQVVBLEVBQUNBLFFBQVFBO1FBQzVDYSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUN0Q0EsTUFBTUEsRUFBRUEsV0FBV0E7WUFDbkJBLE1BQU1BLEVBQUVBLFVBQVVBO1lBQ2xCQSxRQUFRQSxFQUFFQSxRQUFRQTtTQUNyQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBU0EsS0FBS0E7WUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBakdNYixtQkFBT0EsR0FBa0JBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO0lBa0dwREEsa0JBQUNBO0FBQURBLENBdEdBLEFBc0dDQSxJQUFBO0FBdEdZLG1CQUFXLGNBc0d2QixDQUFBIiwiZmlsZSI6Im1vZHVsZXMvcmVzdC91c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xuICAgIHJlc3Q6IHJlc3Rhbmd1bGFyLklTZXJ2aWNlO1xuICAgIHJlc3RGdWxsOiByZXN0YW5ndWxhci5JU2VydmljZTtcbiAgICBjdXJyZW50VXNlcjogc3RyaW5nO1xuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWydSZXN0YW5ndWxhciddO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHJlc3Q6IHJlc3Rhbmd1bGFyLklDb2xsZWN0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzdCA9IHJlc3Qud2l0aENvbmZpZygoUmVzdGFuZ3VsYXJDb25maWd1cmVyKSA9PiB7XG4gICAgICAgICAgICBSZXN0YW5ndWxhckNvbmZpZ3VyZXIuc2V0QmFzZVVybCgnL2FwaS92MS8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVzdEZ1bGwgPSByZXN0LndpdGhDb25maWcoKFJlc3Rhbmd1bGFyQ29uZmlndXJlcikgPT4ge1xuICAgICAgICAgICAgUmVzdGFuZ3VsYXJDb25maWd1cmVyLnNldEJhc2VVcmwoJy9hcGkvdjEvJyk7XG4gICAgICAgICAgICBSZXN0YW5ndWxhckNvbmZpZ3VyZXIuc2V0RnVsbFJlc3BvbnNlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAqKmdldCoqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIGEgdXNlciB3aXRoIHNwZWNpZmljIGlkLlxuICAgIGdldChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0Lm9uZSgndXNlcnMnLCBpZCkuZ2V0KCkudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipsb2dpbioqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIHVzZXIgbG9naW4uXG4gICAgbG9naW4odXNlcjogeyB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nIH0pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IHVzZXIudXNlcm5hbWU7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3Qub25lKCdhdXRoJykucG9zdCgnbG9naW4nLCB1c2VyKTtcbiAgICB9XG5cbiAgICAvLyAqKmxvZ291dCoqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIGEgdXNlciBsb2dvdXQuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0Lm9uZSgnYXV0aCcpLnBvc3QoJ2xvZ291dCcpO1xuICAgIH1cbiAgICBcbiAgICAvLyAqKmdldEN1cnJlbnRVc2VyKipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBzdHJpbmcgd2l0aCB1c2VyaWRcbiAgICBnZXRDdXJyZW50VXNlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ21lJyk7XG4gICAgfVxuXG4gICAgLy8gKipnZXRVc2VycyoqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIGxpc3Qgb2YgdXNlcnNcbiAgICBnZXRVc2Vycygpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0LmFsbCgndXNlcnMnKS5nZXRMaXN0KCkudGhlbihmdW5jdGlvbih1c2Vycyl7XG4gICAgICAgICAgICByZXR1cm4gdXNlcnM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vICoqZ2V0VXNlckJ5VXNlcklkKipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggdXNlciB3aXRoIHVzZXJJZFxuICAgIGdldFVzZXJCeVVzZXJJZCh1c2VySWQ6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3Qub25lKCd1c2VycycsIHVzZXJJZCkuZ2V0KCkudGhlbihmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAqKmFkZFVzZXIqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBzdGF0dXMgY29kZVxuICAgIGFkZFVzZXIodXNlcil7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3RGdWxsLmFsbCgndXNlcnMnKS5wb3N0KHVzZXIpO1xuICAgIH1cblxuICAgIC8vICoqdXBkYXRlVXNlcioqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIHN0YXR1cyBjb2RlXG4gICAgdXBkYXRlVXNlcih1c2VySWQsdXNlcil7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3RGdWxsLm9uZSgndXNlcnMnLHVzZXJJZCkuY3VzdG9tUFVUKHVzZXIpO1xuICAgIH1cblxuICAgIC8vICoqZGVsZXRlVXNlcioqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIHN0YXR1cyBjb2RlXG4gICAgZGVsZXRlVXNlcih1c2VySWQpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0RnVsbC5vbmUoJ3VzZXJzJywgdXNlcklkKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvLyAqKlNhdmV1c2VyU2V0dGluZyoqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIHN0YXR1cyBjb2RlXG4gICAgc2F2ZVVzZXJTZXR0aW5nKHVzZXJJZCwgc2V0dGluZyl7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3RGdWxsLm9uZSgndXNlcnMnLHVzZXJJZCkuY3VzdG9tUFVUKHNldHRpbmcpO1xuICAgIH1cblxuICAgIC8vICoqZ2V0TGRhcFVzZXJzKipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggbGlzdCBvZiB1c2Vyc1xuICAgIGdldExkYXBVc2Vycygpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0LmFsbCgnZXh0ZXJuYWx1c2VycycpLmdldExpc3QoKS50aGVuKGZ1bmN0aW9uKHVzZXJzKXtcbiAgICAgICAgICAgIHJldHVybiB1c2VycztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXRMZGFwVXNlcnMgd2l0aCBwYWdlIG51bWJlciBhbmQgcGFnZVNpemUgcGFyYW1ldGVycyoqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIGxpc3Qgb2YgdXNlcnNcbiAgICBnZXRMZGFwVXNlcnNQYWdlKHNlYXJjaFF1ZXJ5LHBhZ2VOdW1iZXIscGFnZVNpemUpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0Lm9uZSgnZXh0ZXJuYWx1c2VycycpLmdldCh7XG4gICAgICAgICAgICBzZWFyY2g6IHNlYXJjaFF1ZXJ5LFxuICAgICAgICAgICAgcGFnZW5vOiBwYWdlTnVtYmVyLFxuICAgICAgICAgICAgcGFnZXNpemU6IHBhZ2VTaXplXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24odXNlcnMpe1xuICAgICAgICAgICAgcmV0dXJuIHVzZXJzO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=