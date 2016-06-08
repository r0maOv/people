angular.module('people')
    .controller('LanguageCtrl', ['$http', '$document', function ($http, $document) {

        var self = this;
        var elId, dbId; //element id in the table, instance id in the database

        $http.get('/api/languages').then(function (res) {
            self.languages = res.data;
        });

        self.language = {};
        
        self.getId = function () {
            return dbId;
        };


        self.reset = function () {
            return self.language = {
                name: ''
            }
        };


        self.create = function () {
            $http.post('/api/languages', self.language).then(function (res) {
                self.languages.push(res.data);
                self.reset();
            })
        };

        
        self.edit = function (el) {
            elId = self.languages.indexOf(el);
            dbId = el._id;
            self.language.name = el.name;
        };


        self.update = function (el) {
            $http.put('/api/languages/' + dbId, el).then(function (res) {
                self.languages[elId].name = res.data.name;
                self.reset();
                dbId = null;
            });
        };


        self.showModal = function (el) {
            self.isOpened = true;
            dbId = el._id;
            elId = self.languages.indexOf(el);
            self.langName = el.name;
        };


        self.hideModal = function () {
            self.isOpened = false;
            dbId = null;
            elId = null;
        };


        self.delete = function () {
            $http.delete('/api/languages/' + dbId).then(function () {
                self.languages.splice(elId, 1);
                self.isOpened = false;
                dbId = null;
                elId = null;
            });
        };


        self.sendData = function (event) {
            if (event.keyCode == 13)
                self.create();
        };

    }]);