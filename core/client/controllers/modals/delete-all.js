var DeleteAllController = Ember.Controller.extend({
    actions: {
        confirmAccept: function () {
            var self = this;

            ic.ajax.request(this.get('ghostPaths').apiUrl('db'), {
                type: 'DELETE',
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-param"]').attr('content')
                }
            }).then(function () {
                self.notifications.showSuccess('All content deleted from database.');
            }).catch(function (response) {
                self.notifications.showErrors(response);
            });
        },

        confirmReject: function () {
            return false;
        }
    },

    confirm: {
        accept: {
            text: 'Delete',
            buttonClass: 'button-delete'
        },
        reject: {
            text: 'Cancel',
            buttonClass: 'button'
        }
    }
});

export default DeleteAllController;
