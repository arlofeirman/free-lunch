import Ember from 'ember';
import {
  storageFor
} from 'ember-local-storage';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  // stores credentials
  credentials: storageFor('auth'),

  // if there is a token this is true
  isAuthenticated: Ember.computed.bool('credentials.token'),

  // property for unread messages notification
  messages: null,

  // creates an engineer profile in the database when
  // a user selects account type engineer on sign up
  createEngineer(credentials) {
    return this.get('ajax').post('/engineers', {
      data: {
        engineer: {
          name: credentials.email,
          website: credentials.website
        },
      },
    });
  },
  createRecruiter(credentials) {
    return this.get('ajax').post('/recruiters', {
      data: {
        recruiter: {
          name: credentials.email,
          website: credentials.website
        }
      }
    });
  },
  showProfile() {
    const typeOfUser = this.get('credentials.content.type');
    if (typeOfUser === 'engineer') {
      return 'engineer';
    } else if (typeOfUser === 'recruiter') {
      return 'recruiter';
    }
  },
  postConversation(engineerId) {
    return this.get('ajax').post('/conversations', {
      data: {
        conversation: {
          engineer_id: engineerId
        }
      }
    });
  },
  getEngineer(id) {
    return this.get('ajax').post('/engineers/' + id);
  },

  getMessagesForConversation(id) {
    return this.get('ajax').request('/messages?id=' + id)
      .then((obj) => {
        const userType = this.get('credentials.type');
        return obj.messages.filter((message) => {
          return message.lunchable_type.toLowerCase() !== userType;
        });
      });
  },
  updateEngineerUrl(newUrl, path) {
    return this.get('ajax').patch(path + 42, {
      data: {
        engineer: {
          website: newUrl
        }
      }
    });
  }
});
