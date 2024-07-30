#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BassoonInfraStack } from '../lib/bassoon-infra-stack';
import { TradingPartnerStack } from '../lib/trading-partner-stack';

const app = new cdk.App();
new BassoonInfraStack(app, 'BassoonInfraStack', {});
new TradingPartnerStack(app, 'TradingPartnerStack', {});