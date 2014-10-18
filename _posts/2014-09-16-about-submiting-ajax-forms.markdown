---
layout: post
title:  "About Submiting Asynchronous Forms"
date:   2014-10-1 20:00:00
categories: webdev javascript firefox ajax
image: /images/posts/ajax-submit2x.jpg
---

I've seen some websites having problems with browsers autocompletion functions recently and I thought I should write something about it. My browser simply would not recognize some asynchronous form submissions and would not save my password. Like everyone else, I love my autocomplete and I don't like who don't let me use it.

Most popular browsers nowadays have quite smart form completion functionalities. Firefox, for example, came a long way by supporting forms created dynamically by Javascript. But I saw some websites completely disregarding the way you should implement a web form, breaking auto-complete in every browser there is.

The problems with these forms were they used anchor elements or images as submission buttons, using some code like the one bellow:

Let's look at this asynchronous form:

__html__
{% highlight html %}
<form id="login-form">
  <input type="text" name="username">
  <input type="password" name="password">
  <a id="submit-button">Submit</a>
</form>
{% endhighlight %}

__Javascript__
{% highlight javascript %}
var formButton = document.getElementById("submit-button");
formButton.addEventListener('click', function(evt){
  evt.preventDefault();
  var xhr = var xhr = new XMLHttpRequest();
  ...
});
{% endhighlight %}

This is a really bad idea. We have semantically correct elements to submit the form, namely `<button>` and `<input type="submit">`, which should be used in these situations. Using the correct elements throughout your webpage is important for both your browser and indexers, as Google, to understand correctly what you mean. CSS is always there to help you make them look exactly the way you want.

So please, when writing your forms, or any part of a web page for that matter, please use the correct semantic element to do what you want.