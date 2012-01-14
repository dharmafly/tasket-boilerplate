Tasket Boilerplate
==================
[Tasket Boilerplate][#boilerplate] is a simple, wrapped version of [Tasket][#about], the open-source micro-task web app. The boilerplate has the [Tasket core repository][#corerepo] installed as a Git submodule. This allows you to: [fork the Tasket Boilerplate repo][#fork], add your own custom HTML, JavaScript, CSS, or images for your project and still keep the core Tasket submodule up-to-date.

Managing the Git Repository
---------------------------

The submodule will need to be activated the first time you checkout the 
repository:

    git submodule init
    git submodule update 

This will checkout the latest version of Tasket but the repository itself will
not be set to a particular branch. This is fine for running the application but
if you intend to develop Tasket within the submodule you'll want to set a branch.

    cd tasket
    git checkout master
    cd ../


Configuring the server
----------------------

Tasket has a few dependencies (see [Tasket README][#readme] for details). It's 
recommended to run Tasket in a virtualenv with pip:

    virtualenv --no-site-packages .
    source bin/activate
    

Then install Tasket's requirements. Issuing the following from within a
virtualenv will set up all the 3rd party packages needed for Tasket to run:

    pip install -r tasket/requirements.txt
    

Configuring the Client
----------------------

The `/client/media` folder contains a folder called `custom`, which is for any of the target website's own static assets.

Tasket's own static assets should already be present (as symlinks from `/tasket/client/media`) - e.g. in the `/client/media/lib` and `/client/media/tank` folders. If not, then they should be manually symlinked into the target client:

    cd client/media
    
    # core libraries
    ln -s ../../tasket/client/media/lib .
    
    # specific apps (omit those not required)
    ln -s ../../tasket/client/media/tank .
    ln -s ../../tasket/client/media/notepad .
    
    # back to the root
    cd ../../


Configuring the Web directory
-----------------------------

1) It may be sufficient to symlink the /web folder of Tasket into the root folder:

    ln -s tasket/web .
    
OR...
    
2) On some platforms, Django's web server will not respond to a symlinked 
web folder. You may see the app running with the default Tasket theme, not the extended
custom theme. In such a case, the folder should be _copied_ into the root folder:

    # first delete the symlinked /web folder, then:
    cp -rf tasket/web .

Then amend the /web/settings.py file to point to the appropriate server folder. 
Change this:

    sys.path.append('../server')

to this:

    sys.path.append('../tasket/server')
    
    
/web/local_settings.py
----------------------
    
Any install-specific changes should be made in _local\_settings.py_, following the example
settings in _local\_settings.py.example_:

    cd web
    cp local_settings.py.example local_settings.py
    
    
Setting up the database
-----------------------

As with a plain Tasket installation:

    python manage.py syncdb

then proceed to set up a superuser, then:
    
    python manage.py migrate
    

Running the app locally
-----------------------

Make sure that virtualenv has been activated from the root folder:

    source bin/activate

Run the server:

    cd web
    python manage.py runserver


Build the JavaScript
--------------------

The client-side app requires the compressed versions of the Tasket JavaScript
to have been compiled. To do this ensure you have the most recent version of
Tasket in the submodule:

    cd tasket
    git pull

Then run Smoosh in the root directory. You'll need `smoosh` installed on your path. 
Check the [Tasket README][#readme] for more details.

    cd ../
    smoosh -c ./config.json

NOTE: this is a different `config.json` file than [that in the Tasket directory][#config].

If the JavaScript or CSS has updated, then update the query-string version 
numbers in the HTML file, e.g. in /client/tank.html :

    <script src="/media/tasket/js/tasket.min.js?v0.8"></script>
    

If the files have changed, be sure to commit them into to the repository:

    git add .
    git commit -m "Merging Tasket changes"
    git push


[#about]: http://dharmafly.com/tasket
[#corerepo]: https://github.com/dharmafly/tasket
[#boilerplate]: https://github.com/dharmafly/tasket-boilerplate
[#config]: https://github.com/dharmafly/tasket/blob/master/client/media/js/build/config.json
[#readme]: https://github.com/dharmafly/tasket/blob/master/README.md
[#fork]: https://github.com/dharmafly/tasket-boilerplate/fork_select
