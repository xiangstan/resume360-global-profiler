## Install NGiNX web service

```bash
sudo dnf install nginx
```
Type `y` when it prompts **Is this ok [y/N]**.

#### Start NGiNX service

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

## Open firewall

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload
# check all existing rules
sudo firewall-cmd --list-all
```

## Allow NGiNX to connect to the network

```bash
sudo setsebool -P httpd_can_network_connect 1
sudo systemctl restart nginx
```