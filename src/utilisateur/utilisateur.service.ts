import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class UtilisateurService {

    lastid = 0;

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async createUser(username: string) {

    }

    async findAll() {

    }

}

