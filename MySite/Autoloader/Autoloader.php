<?php

class Autoloader
{
    protected $namespacesMap = array();

    public function addNamespace($namespace, $rootDir)
    {
        if (is_dir($rootDir)) {
            $this->namespacesMap[$namespace] = $rootDir;
            return true;
        }

        return false;
    }

    public function register()
    {
        spl_autoload_register(array($this, 'autoload'));
    }

    protected function autoload($class)
    {
        $pathParts = explode('\\', $class);

        if (is_array($pathParts)) {
            $namespace = array_shift($pathParts);

            if (!empty($this->namespacesMap[$namespace])) {
                $filePath = $this->namespacesMap[$namespace] . '/' . $namespace . DIRECTORY_SEPARATOR . implode('/', $pathParts) . '.php';
                require_once $filePath;
                return true;
            }
        }

        return false;
    }
}
