import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { BloodWorkForm } from './components/BloodWorkForm';
import { BloodWorkList } from './components/BloodWorkList';
import { BloodWorkReport } from './components/BloodWorkReport';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/form/:id' component={BloodWorkForm} />
    <Route path='/list' component={ BloodWorkList } />
    <Route path='/report' component={ BloodWorkReport } />
</Layout>;
