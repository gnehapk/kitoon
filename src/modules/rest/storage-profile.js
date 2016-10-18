/// <reference path="../../../typings/tsd.d.ts" />
var StorageProfileService = (function () {
    function StorageProfileService(rest) {
        this.rest = rest.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('/api/v1/');
        });
        this.restFull = rest.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('/api/v1/');
            RestangularConfigurer.setFullResponse(true);
        });
    }
    // **getList**
    // **@returns** a promise with all Storage Profiles.
    StorageProfileService.prototype.getList = function () {
        return this.rest.all('storageprofiles').getList().then(function (storageprofiles) {
            return storageprofiles;
        });
    };
    // **getByName**
    // **@returns** a promise with a Storage Profile.
    StorageProfileService.prototype.getByName = function (name) {
        return this.rest.one('storageprofiles', name).get().then(function (storageprofile) {
            return storageprofile;
        });
    };
    // **Add**
    // **@returns** add a new storage profile
    StorageProfileService.prototype.add = function (storageprofile) {
        return this.restFull.all('storageprofiles').post(storageprofile);
    };
    StorageProfileService.$inject = ['Restangular'];
    return StorageProfileService;
})();
exports.StorageProfileService = StorageProfileService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcmVzdC9zdG9yYWdlLXByb2ZpbGUudHMiXSwibmFtZXMiOlsiU3RvcmFnZVByb2ZpbGVTZXJ2aWNlIiwiU3RvcmFnZVByb2ZpbGVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU3RvcmFnZVByb2ZpbGVTZXJ2aWNlLmdldExpc3QiLCJTdG9yYWdlUHJvZmlsZVNlcnZpY2UuZ2V0QnlOYW1lIiwiU3RvcmFnZVByb2ZpbGVTZXJ2aWNlLmFkZCJdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBUWxEO0lBSUlBLCtCQUFZQSxJQUE2QkE7UUFDckNDLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFVBQUNBLHFCQUFxQkE7WUFDOUNBLHFCQUFxQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDakRBLENBQUNBLENBQUNBLENBQUNBO1FBQ0hBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFVBQUNBLHFCQUFxQkE7WUFDbERBLHFCQUFxQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7WUFDN0NBLHFCQUFxQkEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDaERBLENBQUNBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBRURELGNBQWNBO0lBQ2RBLG9EQUFvREE7SUFDcERBLHVDQUFPQSxHQUFQQTtRQUNJRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLE9BQU9BLEVBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFTQSxlQUFzQ0E7WUFDbEgsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUMzQixDQUFDLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBRURGLGdCQUFnQkE7SUFDaEJBLGlEQUFpREE7SUFDakRBLHlDQUFTQSxHQUFUQSxVQUFVQSxJQUFZQTtRQUNsQkcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBU0EsY0FBOEJBO1lBQzVHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDMUIsQ0FBQyxDQUFDQSxDQUFDQTtJQUNQQSxDQUFDQTtJQUVESCxVQUFVQTtJQUNWQSx5Q0FBeUNBO0lBQ3pDQSxtQ0FBR0EsR0FBSEEsVUFBSUEsY0FBa0JBO1FBQ2xCSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBO0lBQ3JFQSxDQUFDQTtJQS9CTUosNkJBQU9BLEdBQWtCQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtJQWdDcERBLDRCQUFDQTtBQUFEQSxDQW5DQSxBQW1DQ0EsSUFBQTtBQW5DWSw2QkFBcUIsd0JBbUNqQyxDQUFBIiwiZmlsZSI6Im1vZHVsZXMvcmVzdC9zdG9yYWdlLXByb2ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5leHBvcnQgaW50ZXJmYWNlIFN0b3JhZ2VQcm9maWxlIHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcnVsZTogeyBkaXNrdHlwZTogbnVtYmVyLCBzcGVlZDogbnVtYmVyIH0sXG4gICAgcHJpb3JpdHk6IG51bWJlcixcbiAgICBkZWZhdWx0OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBTdG9yYWdlUHJvZmlsZVNlcnZpY2Uge1xuICAgIHJlc3Q6IHJlc3Rhbmd1bGFyLklTZXJ2aWNlO1xuICAgIHJlc3RGdWxsOiByZXN0YW5ndWxhci5JU2VydmljZTtcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnUmVzdGFuZ3VsYXInXTtcbiAgICBjb25zdHJ1Y3RvcihyZXN0OiByZXN0YW5ndWxhci5JQ29sbGVjdGlvbikge1xuICAgICAgICB0aGlzLnJlc3QgPSByZXN0LndpdGhDb25maWcoKFJlc3Rhbmd1bGFyQ29uZmlndXJlcikgPT4ge1xuICAgICAgICAgICAgUmVzdGFuZ3VsYXJDb25maWd1cmVyLnNldEJhc2VVcmwoJy9hcGkvdjEvJyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlc3RGdWxsID0gcmVzdC53aXRoQ29uZmlnKChSZXN0YW5ndWxhckNvbmZpZ3VyZXIpID0+IHtcbiAgICAgICAgICAgIFJlc3Rhbmd1bGFyQ29uZmlndXJlci5zZXRCYXNlVXJsKCcvYXBpL3YxLycpO1xuICAgICAgICAgICAgUmVzdGFuZ3VsYXJDb25maWd1cmVyLnNldEZ1bGxSZXNwb25zZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXRMaXN0KipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggYWxsIFN0b3JhZ2UgUHJvZmlsZXMuXG4gICAgZ2V0TGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5hbGwoJ3N0b3JhZ2Vwcm9maWxlcycpLmdldExpc3Q8U3RvcmFnZVByb2ZpbGU+KCkudGhlbihmdW5jdGlvbihzdG9yYWdlcHJvZmlsZXM6IEFycmF5PFN0b3JhZ2VQcm9maWxlPikge1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JhZ2Vwcm9maWxlcztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXRCeU5hbWUqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBhIFN0b3JhZ2UgUHJvZmlsZS5cbiAgICBnZXRCeU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3Qub25lKCdzdG9yYWdlcHJvZmlsZXMnLCBuYW1lKS5nZXQ8U3RvcmFnZVByb2ZpbGU+KCkudGhlbihmdW5jdGlvbihzdG9yYWdlcHJvZmlsZTogU3RvcmFnZVByb2ZpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzdG9yYWdlcHJvZmlsZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipBZGQqKlxuICAgIC8vICoqQHJldHVybnMqKiBhZGQgYSBuZXcgc3RvcmFnZSBwcm9maWxlXG4gICAgYWRkKHN0b3JhZ2Vwcm9maWxlOiB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0RnVsbC5hbGwoJ3N0b3JhZ2Vwcm9maWxlcycpLnBvc3Qoc3RvcmFnZXByb2ZpbGUpO1xuICAgIH1cbn1cbiJdfQ==
