# TAO Conventional Commit preset

Preset for [conventional changelog](https://github.com/conventional-changelog) extending the standard preset [conventionalcommits](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-conventionalcommits).

This preset relies on the conventional commits [specification](https://www.conventionalcommits.org/en/v1.0.0/).

## Usage

It should be in the project dependencies :

```
npm i --save @oat-sa/conventional-changelog-tao
```

To load it as part of conventional-changelog function :

```js
import conventionalRecommendedBump from 'conventional-recommended-bump';
conventionalRecommendedBump(
    {
        preset: {
            name: '@oat-sa/tao'
        }
    },
    config,
    callback
);
```

## Preset content

The preset exposes a function that accept in parameter either :

-   a default configuration
-   a callback
    This function should return a `Promise` that resolves with the preset configuration.

The preset configuration contains the following properties :

-   [conventionalChangelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-core#api)
-   [gitRawCommitsOpts](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/git-raw-commits#gitrawcommitsgitopts-execopts)
-   [parserOpts](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#conventionalcommitsparseroptions)
-   [writerOpts](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-writer#options)
-   [recommendedBumpOpts](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump#options)
