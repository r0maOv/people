angular.module('people')
    .controller('EducationCtrl', ['$http', function ($http) {

        var self = this;
        var elId, dbId; //element id in the table, instance id in the database

        self.institute = {};
        
        self.getId = function () {
            return dbId;
        };

        self.reset = function () {
            return self.institute = {
                name: ''
            }
        };

        $http.get('/api/education').then(function (res) {
            self.education = res.data;
        });


        self.create = function () {
            $http.post('/api/education', self.institute).then(function (res) {
                self.education.push(res.data);
                self.reset();
            })
        };

        
        self.edit = function (el) {
            elId = self.education.indexOf(el);
            dbId = el._id;
            self.institute.name = el.name;
        };


        self.update = function (el) {
            $http.put('/api/education/' + dbId, el).then(function (res) {
                self.education[elId].name = res.data.name;
                self.reset();
                dbId = null;
            });
        };


        self.delete = function (el) {
            elId = self.education.indexOf(el);
            $http.delete('/api/education/' + el._id).then(function () {
                self.education.splice(elId, 1);
                dbId = null;
            });
        };

        
        self.sendData = function (event) {
            if (event.keyCode == 13)
                self.create();
        };

    }]);