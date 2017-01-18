# Social Enterprise React Frontend

## Deployment

### Manually

1. [Grab a release](https://github.com/cised-ca/se-dir-frontend-react/releases)
2. Extract it where your webserver can serve it
3. Create a `config.json` file and replace the URL with your API root.
   (See the [social-enterprise-directory](https://github.com/cised-ca/social-enterprise-directory)
   repository if you want to deploy the backend as well):

```
{
  "api_root": "https://example.org/api/"
}
```

### With Ansible

See [the README in the se-dir-ansible repository](https://github.com/cised-ca/se-dir-ansible).

## Development Environment

1. `npm install -g yo generator-react-webpack` # Install yeoman and the generator
2. `git clone https://github.com/cised-ca/se-dir-frontend-react.git` # Clone this repo
3. `cd se-dir-frontend-react && npm install` # Install dependencies
4. `cp src/config.dist.json src/config.json` # Copy the default configs
5. Edit `src/config.json` to match your configuration

You can then generate react components [as documented](https://github.com/newtriks/generator-react-webpack#generating-new-components).

The [documented commands](https://github.com/newtriks/generator-react-webpack#usage) are available.
