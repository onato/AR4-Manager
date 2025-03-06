[![Coverage](https://www.onato.com/AR4-Manager/badge.svg)](https://www.onato.com/AR4-Manager/lcov-report/)

# Install the App

[![QR Code with Logo](assets/images/qrcode_with_logo.png)](https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.onato.AR4Manager)

# UI Testing

The UI tests are implemented with [Maestro](https://www.maestro.dev/) and are in the `flows/` directory.

### Install with

```bash
brew tap mobile-dev-inc/tap
brew install maestro
```

### Run with

```bash
maestro test flows/timetable.yaml; maestro test flows/program.yaml
```

# Unit/Integration Tests

```bash
npm test
```

# Build and Run

```bash
npx expo run:android
```

# Release

A new version will be created by `scripts/bump_version.sh` if there are `fix:` or `feat:` commits since the last release.

If the current version has not been published to the Play Store the `.github/workflows/build.yml` workflow will build and upload it for the `Internal Testing` track.

# User Instructions

[AR4 NFC Instructions_V1.1.pdf](docs/manual/AR4%20NFC%20Instructions_V1.1.pdf)
