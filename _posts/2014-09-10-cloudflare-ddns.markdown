---
layout: post
title:  "Dynamic DNS using CloudFlare"
date:   2014-09-15 03:00:00
categories: network raspberry-pi
image: /images/posts/cloudflare2x.png
---

Some months ago I finally got my hands at a Raspberry Pi. Much like any other descent person I started trying all sorts of fun and useless projects on it. Finally I settled down with a boring, but useful, XBMC media server.

A well-configured media server completely automates the movie/series watcher pains. This would save me some precious minutes every day, which is every programer dream and goal.

My problem was that some times I feel the need to connect to my Raspberry Pi when I'm not at home. My ssh server was ready for action, but my ISP refuses to provide me with a static IP address. The best solution seemed to be a Dynamic DNS service. Browsing around I could not find a single descent free DDNS. Paying something for the rare occasions where I need a connection seemed wrong.

Then an idea went through my head. I have been a CloudFlare client for some years now and I really enjoy their services. They provide a DNS registry for your domains and a badass API to interact with everything. How hard would it be to use this API as a custom made DDNS?

It turns out it's not hard at all, and it works pretty well. I found a [nice script][ricescript] by Aaron Rice that followed the principle I was looking for. I still needed more features, so I made my own version based on his. It has some fallback IP services, it will only send requests when the IP changes and you can manage a list of different domains.

<script src="https://gist.github.com/rittme/8296384.js"></script>

You will have to configure it with your own file paths and CloudFlare credentials. You will also have to enter the list of the domains you want to keep updated at the <span class="code">domains</span> tuple. To find all the information you need about you domain you can use the following curl command:

{% highlight bash %}
curl https://www.cloudflare.com/api_json.html \
  -d 'a=rec_load_all' \
  -d 'tkn=CLOUDFLARE_TOKEN' \
  -d 'email=MY_EMAIL' \
  -d 'z=DOMAIN' >> response.json;
{% endhighlight %}

You should replace <span class="code">CLOUDFLARE_TOKEN</span>, <span class="code">MY_EMAIL</span> and <span class="code">DOMAIN</span> with the correct values for you. In the response.json file you can find all the DNS records for the domain.

Now, to be always up to date we have to make sure this script runs on a cron job. For that you should run:
{% highlight bash %}
crontab -e
{% endhighlight %}

This will open your crontab for editing, and you can add the following line at the end of it:
{% highlight bash %}
*/15   *  *  *  *  python /path/to/your/script
{% endhighlight %}

Include the correct path to your script at the defined place. If you want an update frequency different from 15 minutes, you can change this value as well.

Now you should have your domain always pointing to your IP address and your machine accessible to the outside world. Just, please, don't forget about the security concerns of opening your doors and take every reasonable precaution not to have strangers getting into hour home.

[ricescript]: https://gist.github.com/riceo/2401865