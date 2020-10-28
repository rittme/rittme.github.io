---
layout: post
title:  "Another Summer at Mozilla: Password Manager"
date:   2015-09-28 20:30:00
categories: mozilla firefox password-manager
image: /images/posts/pwmgr2x.png
---

Another summer went by and one more amazing internship reached it end. It's that time again, when I talk about how was my internship and what I did during the summer.

During this summer I worked at the Firefox Password Manager Team. Our goal was to make the best password manager for the web, integrated into the Firefox Desktop and Mobile browsers.

## Making a Better Password Manager ##
Logging in is one the most common actions on the Web. Every web service you use require login credentials. Keeping tab of all your passwords isn't easy.
People have different methods to cope with this. Some use the same password everywhere, some keep a file with all their passwords, while others use post-its around their screen. All of this is really bad for your security. Loose that single password you use everywhere and you will be in a lot of trouble.

A good password manager is supposed to store all your passwords securely, detect login pages and fill the forms automatically. Making heuristics that work reliably across the web is something complex, that deserves an entire post only about it.

For this post I would like to quickly go through what I did during this summer.

## UI Improvements ##
One of our main goals is to make the password manager more user friendly. Some of our interfaces didn't really allow for users to have full control of  the manager behavior.

### Capture popup ###
![Old password capture doorhanger](/images/in-content/sad-doorhanger.png){: .center-image width="420px"}
This is probably the best example of lack of control. The user had only the choice to save the password or not save it (or never save, for that matter). But what password is this? Am I sure the browser got the right field? What do I do if I have a typo?

![New password capture doorhanger](/images/in-content/happy-doorhanger.png){: .center-image width="386px"}
With the new capture doorhanger, you can actually see the username and password that were captured. Both username and password fields are editable, so if you have a typo, or the wrong field was captured, you can fix it before saving.

### Context Menu Fill ###
This one was supposed to be a fix for [Bug 433238](https://bugzilla.mozilla.org/show_bug.cgi?id=433238) which we could simplify as: the user don't have an interface to select which login to fill if there is no username field.

We ended up with a nice interface in the context menu, which can be useful in many situations. Just right click your username to fill the login form, or right click you password if you only want to fill that field.

 <video width="528" height="394" class="center-image" autoplay loop preload muted>
  <source src="/images/in-content/menufill.mp4" type="video/mp4">
  ![Context Menu Fill](/images/in-content/<menufill class="gif"></menufill>)
</video>

## Presentation ##
If you want to know more about what I did, take a look at my summer internship presentation bellow.

<iframe class="center-image" src="/mozilla-2015/load.html" width="760" height="444" frameborder="0" allowfullscreen></iframe> 

Edit: Mozilla seems to have lost the presentation video, so I replaced it with the slides.

{::comment}
## The team ##
In this post I wanted to cover mostly the features I worked on. Check my post about __the Password Manager Team__ to have a full view of the project.
{:/comment}
