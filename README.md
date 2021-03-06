# Free Lunch

Capstone project for the Web Development Immersive at General Assembly Boston. This is the repository for the client side application. Free lunch is a networking app for software engineers who want to get taken out to lunch. And for recruiters who are looking for talent. This is the second iteration of the prototype application.

I built the app over a 5-day sprint. The server may take 15 to 30 seconds to respond when you first create an account. The back end is hosted on Heroku, which puts the API to sleep after 30 minutes of inactivity.
Fore more information [click here.](https://devcenter.heroku.com/articles/free-dyno-hours)

To test the app sign up for both an engineer and a recruiter account, then send yourself a message!

[Link to wire frames](http://imgur.com/a/zT79X)

[Link to user stories](https://www.dropbox.com/s/5vsgxw92bowak0o/free-lunch-stories.pdf?dl=0)

[Link to deployed app](https://arlofeirman.github.io/free-lunch/#/)

[Link to backend repository](https://github.com/arlofeirman/freelunch-api)

### Screen shot of the application

![](http://i.imgur.com/KFnIxxS.png)

### Technologies
This app was built with Ember.js and ember-paper. I Used [https://github.com/poteto/ember-cli-flash](https://github.com/poteto/ember-cli-flash) for flash messages and built a [back end](https://github.com/arlofeirman/freelunch-api) for the app with Ruby on Rails,

#### Installation
If you wish to fork and clone this repo you will need to install dependencies by running ```bower install``` and ```npm install```

## Planning
I started the project by writing user stories. I then drew wire frames and made an ERD. I wrote pseudocode for every feature. Through this process I was able to more accurately see complexity and strip down my plan to a mininum viable product.

## Building
I built the back end application first. I worked on one resource at a time, referring to my user stories and pseudocode while creating each API endpoint. I tested each route with curl scripts.

I implimented the ember app one feature at a time, breaking each feature into as many small steps as possible. Often writing out the steps and logic on paper before I began writing JavaScript. I implemented user authentication and authorization for two account types. The logical first step after that was to write the code to allow a recruiter to send an engineer a message. I then worked on the engineer's ability to respond. 

I kept a running list of bugs and features. This helped me to stay on task without forgetting about the loose ends.

## Challenges

This was the first app I built with ember. I struggled at certain points because of my lack of experience with the framework. I went to the documentation multiple times to read about the way ember defines associations between resources in the model files. 

In the models, I defined a has one relationship between the user and a profile(engineer or recruiter). 
I tried to access the user's profile in the template with```{{model.engineer.name}}``` which did not work. I solved the problem by changing the model hook to retrive all the engineer profiles. Then filtering through them in the component to find the one belonging to the current user.

The js file for the component:

```js
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['text-center'],
  engineer: null,
  auth: Ember.inject.service(),
  userId: Ember.computed.alias('auth.credentials.id'),
  onInit: function() {
    const array = this.get('model');
    const engineer = array.filter((e) => {
    return e.get('userId') === this.get('userId');
  });
  this.set('engineer', engineer[0]);
  }.on('init')
});
```

I could then access the profile's data in the template with ```{{engineer.name}}```








