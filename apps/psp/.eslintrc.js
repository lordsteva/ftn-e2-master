module.exports= {extends: ["plugin:import/errors",
"plugin:import/warnings",
"plugin:import/typescript","@team21/eslint-config-react"],

  settings: {
    "import/resolver": {
      "node": {
        "extensions": [" .js", ".jsx", ".ts", ".tsx"]
      },      "typescript": {}
 
    }
  }

}