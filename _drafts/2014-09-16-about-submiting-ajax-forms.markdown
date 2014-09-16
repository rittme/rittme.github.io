---
layout: post
title:  "About Submiting Assynchronous Forms"
date:   2014-09-16 20:00:00
categories: webdev javascript firefox ajax
image: /images/posts/form-submission.png
---

We all love this AJAX thing nowadays. Submiting your form assynchronously is closer to be the rule than the exception. The possibilities are only limited by our creativity. But using these forms I constantly see a disregard to current standards.

If you're creating your assynchronous form and sending your POST data to your server, but a lot of times you see it brakes functionalities. For example, browser developers work hard to help your users fill their forms automatically. We all love automatic completion. Lots of times AJAX forms don't work with autocomplete.

Let's take a simple example. You created your fancy new assynchronous login form for your website. Neat stuff. Your form looks like this:

{% highlight html %}
<form id="login-form">
  <input type="text" name="username">
  <input type="password" name="password">
  <button id="submit-button">Submit</button>
</form>
{% endhighlight %}

Something quite simple, just for the sake of the example. Your submission code is something on these lines:

{% highlight javascript %}
var formButton = document.getElementById("submit-button");
formButton.addEventListener('click', function(evt){
  evt.preventDefault();
  var xhr = var xhr = new XMLHttpRequest();
  ...
});
{% endhighlight %}

Can you guess what is wrong with this? 

The problem here, is that some browsers like Firefox don't understand this as a form submission. You're only waiting for a click event an then making an assynchronous call. If the browser don't understand it correctly it will not propose for the user to save the username and password used. Would you like a solution that works? 

It's quite simple. All you need to do is actually submit the form, and listen for the submit event. Like this:

{% highlight javascript %}
var form = document.getElementById("login-form");
form.addEventListener('submit', function(evt){
  evt.preventDefault();
  var xhr = var xhr = new XMLHttpRequest();
  ...
});
{% endhighlight %}

This simple change will allow the browser to know that there is a form submission going on. Even though the propagation is stoped, and the page never gets to be submitted, modern browsers are smart enough to know what is happening with a high degree of confidence.

