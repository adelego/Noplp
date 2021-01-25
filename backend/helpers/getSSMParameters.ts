import * as AWS from 'aws-sdk';

interface Parameter {
  name: string;
  withDecryption: boolean;
}

const ssm = new AWS.SSM();

// Random change
const getSSMParameter = async (
  parameterName: string,
  withDecryption: boolean,
) => {
  try {
    const data = await ssm
      .getParameter({ Name: parameterName, WithDecryption: withDecryption })
      .promise();
    const paramValue = data.Parameter?.Value;

    return paramValue;
  } catch (e) {
    console.error(
      `Parameter ${parameterName} was not found in AWS Systems Manager`,
      `Details : `,
      e,
    );
    process.exitCode = 1; // Set exit code when error

    return undefined;
  }
};

export const getSSMParameters = async (
  parameters: Parameter[],
): Promise<Record<string, string>> => {
  const result: Record<string, string> = {};
  await Promise.all(
    parameters.map(async ({ name, withDecryption }) => {
      const value = await getSSMParameter(name, withDecryption);
      if (!value) {
        throw new Error(`Aborting de to ${name} not found...`);
      }
      result[name] = value;
    }),
  );
  return result;
};
