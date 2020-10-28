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

{% highlight python %}
#!/usr/bin/python

# Update a set of A records in Cloudflare with the machine current IP address
#
# If you don't know your domain information (like id), you should run:
#
#  curl https://www.cloudflare.com/api_json.html \
#  -d 'a=rec_load_all' \
#  -d 'tkn=CLOUDFLARE_TOKEN' \
#  -d 'email=MY_EMAIL' \
#  -d 'z=DOMAIN' >> response.json;
#
# In the response.json file you can find all DNS records for the domain.
# Make sure this script runs on a cron job or whenever you get a new IP.
#
# Based on Aaron Rice : cloudflare_dynamic_dns.py (https://gist.github.com/riceo/2401865)
#
# @author Bernardo Rittmeyer <bernardo@rittme.com>

import urllib
import json
import time

IP_FILE_NAME = 'IP FILE PATH'   # Path to the file that contains the actual/old IP address
LOG_FILE_NAME = 'LOG FILE PATH' # Path to the log file
TOKEN = "CLOUDFLARE_TOKEN"      # Your cloudflare token
EMAIL = "MY_EMAIL"              # Your cloudflare account email

# This tuple should have a dictionary for each domain you want to keep up to date
domains = (
  {
    "z"   : "DOMAIN",      # zone_name
    "id"  : "RECORD_ID",   # rec_id
    "name": "RECORD_NAME", # name
    "service_mode"  : 1    # Status of CloudFlare Proxy, 1 = orange cloud, 0 = grey cloud.
  },)

# External IP Address services we use to find our IP Address (if the first fail we use the next one, and so on)
services = ("http://ip.appspot.com/", "http://my-ip.heroku.com/", "http://icanhazip.com", "http://checkip.dyndns.org", "http://curlmyip.com")

def log(message):
  with open(LOG_FILE_NAME, "a") as myfile:
    myfile.write("[%s] %s" % (time.strftime("%d/%m/%Y - %H:%M:%S"), message))

def ddns_update(new_ip):
  "Send the DNS update request to Cloudflare API"
  data = {
    "a"             : "rec_edit",
    "tkn"           : TOKEN,
    "email"         : EMAIL,
    "type"          : "A",
    "content"       : new_ip.strip(),
    "ttl"           : 1
  }

  for d in domains:
    d.update(data)
    try:
      dns_response = json.loads(urllib.urlopen("https://www.cloudflare.com/api_json.html", urllib.urlencode(d)).read())
      if dns_response[u'result'] == "success":
        log("%s IP updated to %s" % (d[name]+"."+d[z], new_ip))
      else:
        log("Error Setting IP for %s" % d[name]+"."+d[z])
    except:
      log("Error with cloudflare API")


#Main script

#Find the new IP
new_ip = ""
for s in services:
  try:
    new_ip = urllib.urlopen(s).read()
  except Exception:
    pass
  if new_ip:
    break

#Find the old IP
old_ip = ""
noFile = False
try:
  with open(IP_FILE_NAME, 'r') as f:
    old_ip = f.read()
except IOError:
   noFile = True

#If IP changed or no IP File, update IP File and send requests to Cloudflare API
if new_ip != old_ip or noFile:
  with open(IP_FILE_NAME,'w') as f:
    f.write(new_ip)
  ddns_update(new_ip)
  log("IP Address updated to: %s" % new_ip)
{% endhighlight %}


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