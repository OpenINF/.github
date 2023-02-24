---
title: Connecting to the Interwebs (Wireless Networking)
category: Documentation
content_type: Install & Setup
published: false
---

<!-- Begin GitHub-Flavored Markdown (GFM)
See: https://docs.github.com/get-started/writing-on-github
Spec: https://github.github.com/gfm
-->

<!-- Not covered: Preparing device for (and installing) host OS --

Windows Server 2016/2022 Standard with Desktop Experience.
Windows Server 2016 Standard is for physical or minimally-virtualized environments.

See: https://www.microsoft.com/en-us/d/windows-server-2016-standard/dg7gmgf0ds12/0004

-->

Before we can begin using our Windows Server machine as an effective software
development environment, there are a few hurdles to overcome. This chapter deals
with enabling and configuring connectivity to the Internet.

## Access to Wi-Fi

As a safe default &mdash; on fresh installations of Windows Server &mdash; Wi-Fi connectivity
is inaccessible because Airplane mode is enabled.

### Configuring Radio Management Service (RmSvc)[^1]

Airplane mode is also grayed-out/unconfigurable (the default preference of "enabled" cannot
be changed). The following commands must be run in an elevated Command Line Shell
prompt to modify this preference.

<!-- FIXME(DerekNonGeneric):
Determine where from & document the below registry modification.
-->

```text
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\RadioManagement\SystemRadioState /ve /t REG_DWORD /d 0 /f
```

```cmd
SC CONFIG RmSvc START= AUTO
```

<!--
https://www.intel.com/content/www/us/en/download/19351/windows-10-and-windows-11-wi-fi-drivers-for-intel-wireless-adapters.html
https://support.lenovo.com/us/en/downloads/ds503062-fibocom-l850-gl-wireless-wan-driver-for-windows-10-version-1709-or-later-thinkpad
-->

If you’re using PowerShell, you should run:

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

[^1]: https://github.com/MicrosoftDocs/windowsserverdocs/blob/main/WindowsServerDocs/security/windows-services/security-guidelines-for-disabling-system-services-in-windows-server.md#radio-management-service
