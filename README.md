<img src="https://incode.com/wp-content/uploads/2022/12/cropped-favicon.jpg?w=96" alt="Incode Logo" title="Incode Developer Sample | Node.js" align="right" height="96" width="96"/>

# Incode HTML / Low Code Samples

Samples include frontend implementations for:

* IFrame app
* Redirect app


See folders for examples.


## IFrame Basic Implementation

````html

<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style>
        html,
        body {
            height: 100%;
        }
    </style>
</head>

<body>
    <iframe title="onboarding"
        src="https://saas-onboarding.incodesmile.com/launchpad/flow/6397638f21886bb3d4648bfd/uuid/99a3ebbf-3757-4bca-85d4-9a05b06b1819/tag/verification?client=incode&components=qr"
        height="667" width="375" frameborder="0" allowusermedia allow="geolocation; microphone; camera;" style="
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
    "></iframe>
</body>

</html>

````
