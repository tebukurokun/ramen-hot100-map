const packageJson = require("./package.json");

module.exports = {
  output: "export",
  // next dev が AI エージェント検知時に AGENTS.md を自動生成するのを無効化
  agentRules: false,
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
  experimental: {
    // TypeScript 7 (native compiler) は Next.js の Compiler API を提供しないため
    useTypeScriptCli: true,
  },
  //   webpack: ( config ) => {
  //     config.module.rules.push(
  //       {
  //         test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
  //         loader: 'url-loader?limit=100000',
  //       },
  //     )
  //     return config
  //   },
  //   webpack5: false,
};
