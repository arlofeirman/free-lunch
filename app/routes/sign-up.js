import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  profiles: Ember.inject.service(),

  actions: {
    signUp(credentials) {
      this.get('auth').signUp(credentials)
        .then(() => this.get('auth').signIn(credentials))
        .then(() => {
          if (credentials.accountType === 'engineer') {
            return this.get('profiles').createEngineer(credentials);

          } else if (credentials.accountType === 'recruiter') {
            return this.get('profiles').createRecruiter(credentials);
          }
        })
        .then(() => this.get('profiles').showProfile())
        .then((profile) => this.transitionTo(profile))
        .then(() => {
          this.get('flashMessages')
            .success('Successfully signed-up! You have also been signed-in.', {
              timeout: 2000
            });
        })
        .catch(() => {
          this.get('flashMessages')
            .danger('There was a problem, Please try again. Make sure your passwords match, The username you chose may be taken.', {
              timeout: 2000
            });
        });
    },
  },
});
