---
title: Connecting to the Interwebs (Wireless Networking)
---

<!-- Begin GitHub-Flavored Markdown (GFM)
See: https://docs.github.com/get-started/writing-on-github
Spec: https://github.github.com/gfm/
-->

Before we can begin using our Windows Server machine as an effective software
development environment, there are a few hurdles to overcome. This chapter deals
with enabling and configuring connectivity to the Internet.

```
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\RadioManagement\SystemRadioState /ve /t REG_DWORD /d 0 /f
```

## Access to WiFi

By default, access to WiFi is disabled in Windows Server 2022. This is because Airplane mode is enabled.
It is also in an unconfigurable state (this preference cannot be changed by default). To be able to modify this
preference, the following command must be run in an elevated Command Line Shell prompt.

```cmd
SC CONFIG RmSvc START= AUTO
```

<!--
https://www.intel.com/content/www/us/en/download/19351/windows-10-and-windows-11-wi-fi-drivers-for-intel-wireless-adapters.html
https://support.lenovo.com/us/en/downloads/ds503062-fibocom-l850-gl-wireless-wan-driver-for-windows-10-version-1709-or-later-thinkpad
-->

```ps
Install-WindowsFeature -Name Wireless-Networking
```

reboot

```ps
shutdown –f –r –t 0
```

start service

```ps
Start-Service WlanSvc –PassThru
```
