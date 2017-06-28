import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
  profiles: Ember.inject.service(),
  credentials: storageFor('auth'),


  model(params) {
    return Ember.RSVP.hash({
      messages: this.get('store').query('message', {
        id: params.conversation_id
      }),
      conversation: this.get('store').find('conversation', params.conversation_id)
    });

  },

  afterModel(model, transition) {
    const userType = this.get('credentials.type');
    const userMessages = model.messages.filter((message) => {
      return message.get('lunchableType').toLowerCase() !== userType;
    });
    userMessages.forEach((e) => {
      e.set('read', true);
      e.save();
    });
  },

  actions: {
    createMessage(messageParams) {
      return this.get('store')
        .createRecord('message', messageParams).save()
        .then(() => this.refresh())
        .then(() => {
          setTimeout(() => {
            let objDiv = document.getElementById("message-container");
            objDiv.scrollTop = objDiv.scrollHeight;
          }, 100);
        })
        .catch(() => {
          this.get('flashMessages')
            .danger('There was a problem. Please try again.');
        });
    }
  }
});
